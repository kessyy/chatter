import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, mergeMap } from 'rxjs/operators';
// import { AuthenticationService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { UserProfileService } from '../../services/user.service'
import { ChatService } from '../../services/chat.service';
import { MessageService } from '../../services/message.service';
import { RoomService } from '../../services/rooms.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-messages-area',
  templateUrl: './messages-area.component.html',
  styleUrls: ['./messages-area.component.scss']
})
export class MessagesAreaComponent implements OnInit {
  @Input() maxHeight: string;
  @Input() isEditUser: boolean;
  @Input() isCloseEditUser: boolean;
  messageForm: FormGroup;
  EditUserForm: FormGroup;
  chatData: any = [];
  user: User;
  room: string;
  message: string;
  showEditUserForm: boolean;
  messages: Message[] = [];
  sentMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authenticationService: AuthenticationService,
    private userProfileService: UserProfileService,
    private roomService: RoomService,
    private chatService: ChatService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // TODO: change this to logged in user
    this.userProfileService.getSingleUser(2).subscribe(
      response => {
        this.user = response as User;
        console.log('logged in', this.user.id)
      })

    // populate the chat whenever chat events occur
    let container = document.querySelector('.conversation-list');
    this.chatService.userJoinedRoom()
      .subscribe(data => {
        this.chatData.push(data)
        this.scrollChat(container);
      });

    this.chatService.userLeftRoom()
      .subscribe(data => {
        this.chatData.push(data)
        this.scrollChat(container);
      });

    this.chatService.messageReceived()
      .subscribe(data => {
        if (data.message) {
          this.chatData.push(data);
        }
        this.scrollChat(container);
        this.message = '';
      });

    this.messageForm = this.formBuilder.group({
      // sender: [this.user.id],
      message: [''],
    });
    this.getMessages();
  }

  get f() {
    return this.messageForm.controls;
  }

  /**
     * Notifies all users when a new user joins a room
     */
  joinRoom() {
    this.chatService.joinRoom(
      {
        user: this.user,
        room: this.room
      });
  }

  /**
     * Handles the chat scroll when a message is received
     * @param container
     */
  scrollChat(container: any) {
    setTimeout(() =>
      container.scrollTop = container.scrollHeight);
  }

  /**
     * Notifies all users when a new user leaves a room
     */
  leaveRoom() {
    this.chatService.leaveRoom(
      {
        user: this.user,
        room: this.room
      });
  }

  // get messages
  getMessages() {
    this.messageService.getMessages().subscribe(response => {
      this.messages = response as Message[];
      console.log('message', this.messages);
    })
  }

  sendMessage() {
    this.messageService.postMessage({
      id: 0,
      user_id: this.user.id,
      message_body: this.f.message.value
    }).pipe(first()).subscribe(
      response => {
        this.sentMessage = response;
        const message = this.sentMessage.addedMessage.insertId;
        this.roomService.addMessageToRoom(2, message).pipe(first()).subscribe(response => {
          console.log('endpoint response for message', response)
        }, error => {
          console.log('endpoint error', error)
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSearch() {
  }

  closeEditUser() {
    document.getElementById('edit-user-form').style.display = 'none';
    document.getElementById('myModal').style.display = 'none';
  };

}
