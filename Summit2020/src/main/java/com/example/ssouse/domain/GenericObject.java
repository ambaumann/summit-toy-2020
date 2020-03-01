package com.example.ssouse.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GenericObject
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String randomString;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getRandomString() {
    return randomString;
  }

  public void setRandomString(String rs) {
    this.randomString = rs;
  }
}
