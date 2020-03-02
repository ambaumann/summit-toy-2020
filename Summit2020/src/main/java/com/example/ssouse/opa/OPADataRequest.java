package com.example.ssouse.opa;

import lombok.Getter;

import java.util.Map;

@Getter
public class OPADataRequest {

  Map<String, Object> input;

  public OPADataRequest(Map<String, Object> input) {
    this.input = input;
  }
}