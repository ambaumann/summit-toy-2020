package com.example.ssouse.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/random")
public class OtherController
{

  @GetMapping(path = "bingo")
  public ResponseEntity<String> getAuthorizedUserName() {
    return ResponseEntity.ok("dark in here");
  }

}
