import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

const BASE_URL = (__ENV.BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const API_BASE = `${BASE_URL}/api/v1/persona`;

const FUSION_WEIGHT = Number(__ENV.FUSION_WEIGHT || 0.3); // 30%
const THINK_TIME_MS = Number(__ENV.THINK_TIME_MS || 200);

const fusionPairs = [
  ["Arsene", "Pixie"],
  ["Angel", "Agathion"],
  ["Jack Frost", "Kelpie"],
  ["Nekomata", "Kodama"],
  ["Onmoraki", "Mandrake"],
];

const fusionReqDuration = new Trend("fusion_req_duration");
const personaListReqDuration = new Trend("persona_list_req_duration");
const personaListItemCount = new Trend("persona_list_item_count");

const fusionErrorRate = new Rate("fusion_error_rate");
const personaListErrorRate = new Rate("persona_list_error_rate");

export const options = {
  vus: Number(__ENV.VUS || 10),
  duration: __ENV.DURATION || "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    fusion_error_rate: ["rate<0.01"],
    persona_list_error_rate: ["rate<0.01"],
  },
};

function getRandomPair() {
  return fusionPairs[Math.floor(Math.random() * fusionPairs.length)];
}

function runFusionRequest() {
  const [name1, name2] = getRandomPair();
  const res = http.get(
    `${API_BASE}/fuse?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`,
    { tags: { endpoint: "fuse" } }
  );

  fusionReqDuration.add(res.timings.duration);
  const ok = check(res, {
    "fuse status is 200": (r) => r.status === 200,
  });
  fusionErrorRate.add(!ok);
}

function runPersonaListRequest() {
  const res = http.get(`${API_BASE}`, { tags: { endpoint: "persona_list" } });

  personaListReqDuration.add(res.timings.duration);
  const ok = check(res, {
    "persona list status is 200": (r) => r.status === 200,
    "persona list is array": (r) => {
      try {
        return Array.isArray(r.json());
      } catch (_err) {
        return false;
      }
    },
  });
  personaListErrorRate.add(!ok);

  if (ok) {
    try {
      const data = res.json();
      if (Array.isArray(data)) {
        personaListItemCount.add(data.length);
      }
    } catch (_err) {
      // Ignore parse failures; request correctness is tracked by checks above.
    }
  }
}

export default function () {
  if (Math.random() < FUSION_WEIGHT) {
    runFusionRequest();
  } else {
    runPersonaListRequest();
  }

  sleep(THINK_TIME_MS / 1000);
}
