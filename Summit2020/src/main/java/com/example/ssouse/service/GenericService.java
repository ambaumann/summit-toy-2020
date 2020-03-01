package com.example.ssouse.service;

import com.example.ssouse.repo.GenericDataAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenericService
{
  @Autowired
  GenericDataAccess genericDataAccess;
}
