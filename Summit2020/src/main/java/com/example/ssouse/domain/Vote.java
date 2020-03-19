package com.example.ssouse.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder=true)
public class Vote
{
  public static final String CAT_OPTION = "CAT";
  public static final String DOG_OPTION = "DOG";

  private String owner;
  private String vote;
}
