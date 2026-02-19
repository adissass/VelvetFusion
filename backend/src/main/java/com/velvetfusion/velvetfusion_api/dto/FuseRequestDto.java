package com.velvetfusion.velvetfusion_api.dto;

import jakarta.validation.constraints.NotBlank;

public class FuseRequestDto {
    @NotBlank(message = "name1 is required")
    private String name1;

    @NotBlank(message = "name2 is required")
    private String name2;

    public String getName1() {
        return name1;
    }

    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }
}
