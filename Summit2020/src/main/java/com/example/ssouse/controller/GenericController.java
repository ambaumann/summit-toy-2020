package com.example.ssouse.controller;

import com.example.ssouse.config.SecurityContextUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/inspect")
public class GenericController
{
  @GetMapping(path = "/username")
  @PreAuthorize("hasAnyAuthority('ROLE_angular-spa2_USER')")
  public ResponseEntity<String> getAuthorizedUserName() {
    return ResponseEntity.ok(SecurityContextUtils.getUserName());
  }

  @GetMapping(path = "/roles")
  @PreAuthorize("hasAnyAuthority('ROLE_angular-spa2_USER')")
  public ResponseEntity<Set<String>> getAuthorizedUserRoles() {
    return ResponseEntity.ok(SecurityContextUtils.getUserRoles());
  }

  @GetMapping(path = "/special-sauce")
  @PreAuthorize("hasAnyAuthority('ROLE_angular-spa2_super-user')")
  public ResponseEntity<String> getSuperPermission() {
    return ResponseEntity.ok("3 wishes.");
  }
}
