package com.sadetech.home_api_module.FeignClient;

import com.sadetech.home_api_module.DTO.ResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "post-module", contextId = "imageClient")
public interface PostImageFeignClient {
    @GetMapping("/posts/user/{userId}/images")
    List<ResponseDTO> getImagePostsByUserId(@PathVariable Long userId);
}
