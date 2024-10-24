package com.sadetech.permission_module.Controller;

import com.sadetech.permission_module.Model.Permission;
import com.sadetech.permission_module.Model.PermissionRequired;
import com.sadetech.permission_module.Service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @PostMapping("/{userId}")
    public ResponseEntity<Permission> createPermission(
            @PathVariable Long userId,
            @RequestParam PermissionRequired permission,
            @RequestParam boolean status) {
        try {
            Permission createdPermission = permissionService.grantPermission(userId, permission, status);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPermission);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PatchMapping("/update-status/{id}")
    public ResponseEntity<Permission>updateStatus(@PathVariable Long id, @RequestParam boolean status){
        try{
            Permission permission = permissionService.updateStatus(id,status);
            return ResponseEntity.status(200).body(permission);
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get-status/{userId}")
    public ResponseEntity<List<Permission>> getAllPermission(@PathVariable Long userId){
        try {
            List<Permission> permissions = permissionService.getAllPermissionByUserId(userId);
            return ResponseEntity.ok(permissions);
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
