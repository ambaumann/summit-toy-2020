package com.example.ssouse.controller;

import com.example.ssouse.config.SecurityContextUtils;
import com.example.ssouse.domain.ResultsSummation;
import com.example.ssouse.domain.Vote;
import com.example.ssouse.service.VoteService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1")
public class APIController
{
  @Autowired
  VoteService voteService;

  ObjectMapper mapper = new ObjectMapper();

  @GetMapping(path = "inspect/username")
  public ResponseEntity<String> getAuthorizedUserName() throws JsonProcessingException
  {
    ObjectNode rootNode = mapper.createObjectNode();
    rootNode.put("username", SecurityContextUtils.getUserName());
    return ResponseEntity.ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode));
  }

  @GetMapping(path = "inspect/roles")
  public ResponseEntity<Set<String>> getAuthorizedUserRoles() {
    return ResponseEntity.ok(SecurityContextUtils.getUserRoles());
  }

  @GetMapping(path = "inspect/authentication")
  public ResponseEntity<JwtAuthenticationToken> getAuthorizedUserAuthentication() {
    JwtAuthenticationToken token = (JwtAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
    return ResponseEntity.ok(token);
  }

  @GetMapping(path = "/public/vote/results")
  public ResponseEntity<ResultsSummation> getResultsSummation() {
    return ResponseEntity.ok(voteService.getResultsSummation());
  }

  @GetMapping(path = "/vote/{username}")
  public ResponseEntity<Vote> getUserVote(@PathVariable String username) {
    Optional<Vote> voteMaybe = voteService.getVote(username);
    return ResponseEntity.of(voteMaybe);
  }

  @GetMapping(path = "/vote")
  public ResponseEntity<List<Vote>> listVotes() {
    return ResponseEntity.ok(voteService.listVotes());
  }

  @PostMapping(path = "/vote")
  public ResponseEntity<Void> vote(@RequestBody Vote vote) {
    if(voteService.getVote(vote.getOwner()).isPresent()) {
      return ResponseEntity.badRequest().build();
    }
    voteService.vote(vote);
    return ResponseEntity.noContent().build();
  }

  @PostMapping(path = "/vote/action/reset")
  public ResponseEntity<Void> resetVotes() {
    voteService.resetVotes();
    return ResponseEntity.noContent().build();
  }
}
