package com.sadetech.permission_module.Repository;

import com.sadetech.permission_module.Model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<Permission,Long> {
    List<Permission> findByUserId(Long userId);
}
