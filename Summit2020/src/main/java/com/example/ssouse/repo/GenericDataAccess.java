package com.example.ssouse.repo;

import com.example.ssouse.domain.GenericObject;
import org.springframework.data.repository.CrudRepository;

public interface GenericDataAccess extends CrudRepository<GenericObject, Long>
{
}
