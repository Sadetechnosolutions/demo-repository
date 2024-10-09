package com.Sadetechno.status_module.Controller;
import com.Sadetechno.status_module.Dto.StatusResponseDTO;
import com.Sadetechno.status_module.Repository.StatusRepository;
import com.Sadetechno.status_module.Service.StatusService;
import com.Sadetechno.status_module.model.Privacy;
import com.Sadetechno.status_module.model.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/statuses")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @Autowired
    private StatusRepository statusRepository;

    @PostMapping("/post")
    public ResponseEntity<Status> postStatus(
            @RequestParam(value = "file",required = false) MultipartFile file,
            @RequestParam(value = "type",required = false,defaultValue = "Image") String type,
            @RequestParam("duration") int duration,
            @RequestParam("privacy") Privacy privacy,
            @RequestParam("userId") Long userId) throws IOException {

        Status status = statusService.saveStatus(file, type, duration, privacy, userId);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<StatusResponseDTO>> getStatusesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(statusService.getStatusesByUserId(userId));
    }
    @GetMapping("/user/status")
    public ResponseEntity<List<StatusResponseDTO>> getAllStatus(){
        return ResponseEntity.ok(statusService.getAllStatus());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Status>> getUserDetailsByStatusId(@PathVariable("id") Long id){
         Optional<Status> status = statusService.getUserDetailsByStatusId(id);
         return ResponseEntity.status(HttpStatus.OK).body(status);
    }

    @DeleteMapping("/delete/{userId}/{id}")
    public ResponseEntity<Void> deleteStatus(@PathVariable Long userId, @PathVariable Long id) {
        // Call the service method to delete the status
        statusService.deleteStatus(userId, id);
        // Return HTTP status OK when the deletion is successful
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}


