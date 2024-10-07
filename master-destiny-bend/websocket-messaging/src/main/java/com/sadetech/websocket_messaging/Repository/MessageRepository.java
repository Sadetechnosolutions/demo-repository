package com.sadetech.websocket_messaging.Repository;

import com.sadetech.websocket_messaging.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
}
