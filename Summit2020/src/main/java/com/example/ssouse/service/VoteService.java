package com.example.ssouse.service;

import com.example.ssouse.domain.ResultsSummation;
import com.example.ssouse.domain.Vote;
import com.example.ssouse.repo.GenericDataAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class VoteService
{
  Map<String, Vote> votes = new ConcurrentHashMap<>();

  @Autowired
  GenericDataAccess genericDataAccess;

  public ResultsSummation getResultsSummation() {
    Integer catVotes = Math.toIntExact(votes.entrySet().stream()
      .filter(vote -> Vote.CAT_OPTION.equalsIgnoreCase(vote.getValue().getVote())).count());
    Integer dogVotes = Math.toIntExact(votes.entrySet().stream()
      .filter(vote -> Vote.DOG_OPTION.equalsIgnoreCase(vote.getValue().getVote())).count());

    return ResultsSummation.builder().catVotes(catVotes).dogVotes(dogVotes).build();
  }

  public Optional<Vote> getVote(String voter) {
    if(!votes.containsKey(voter)) {
      return Optional.empty();
    }
    return Optional.of(votes.get(voter));
  }

  public List<Vote> listVotes() {
    return new ArrayList<>(votes.values());
  }

  public void vote(Vote vote) {
    String voter = vote.getOwner();
    if(votes.containsKey(voter)) {
      throw new RuntimeException("Voters can only vote once.");
    }

    votes.put(voter, vote);
  }

  public void resetVotes() {
    votes = new ConcurrentHashMap<>();
  }

}
