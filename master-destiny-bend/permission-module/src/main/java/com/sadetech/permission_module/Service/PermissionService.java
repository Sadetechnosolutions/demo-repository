package com.sadetech.permission_module.Service;

import com.sadetech.permission_module.Model.Permission;
import com.sadetech.permission_module.Model.PermissionRequired;
import com.sadetech.permission_module.Repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    public Permission grantPermission(Long userId, PermissionRequired permission, boolean status){
        Permission permission1 = new Permission();
        permission1.setUserId(userId);
        permission1.setPermission(permission);
        permission1.setStatus(status);
        return permissionRepository.save(permission1);
    }

    public Permission updateStatus(Long id, boolean status){
        Optional<Permission> permission = permissionRepository.findById(id);

        if(permission.isPresent()){
            Permission permission1 = permission.get();
            permission1.setStatus(status);
            return permissionRepository.save(permission1);
        }else {
            throw new IllegalArgumentException("Id not found");
        }
    }

    public List<Permission> getAllPermissionByUserId(Long userId){
        return permissionRepository.findByUserId(userId);
    }
}
