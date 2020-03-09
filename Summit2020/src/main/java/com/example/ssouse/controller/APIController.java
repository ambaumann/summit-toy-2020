package com.example.ssouse.controller;

import com.example.ssouse.config.SecurityContextUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.util.Set;

@RestController
@RequestMapping("/api/v1")
public class APIController
{
  @GetMapping(path = "inspect/username")
  @RolesAllowed({"ROLE_USER"})
  public ResponseEntity<String> getAuthorizedUserName() {
    return ResponseEntity.ok(SecurityContextUtils.getUserName());
  }

  @GetMapping(path = "inspect/roles")
  @RolesAllowed({"ROLE_USER"})
  public ResponseEntity<Set<String>> getAuthorizedUserRoles() {
    return ResponseEntity.ok(SecurityContextUtils.getUserRoles());
  }

  @GetMapping(path = "inspect/authentication")
  @RolesAllowed({"ROLE_USER"})
  public ResponseEntity<JwtAuthenticationToken> getAuthorizedUserAuthentication() {
    JwtAuthenticationToken token = (JwtAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
    return ResponseEntity.ok(token);
  }

  @GetMapping(path = "/special-sauce")
  @RolesAllowed({"ROLE_SUPER-USER"})
  public ResponseEntity<String> getSuperPermission() {
    return ResponseEntity.ok("3 wishes.");
  }

  @GetMapping(path = "/no-sauce")
  @RolesAllowed({"ROLE_non-existant-role"})
  public ResponseEntity<String> getNonExistantPermission() {
    return ResponseEntity.ok("Closed. Should never be seen.");
  }
}
