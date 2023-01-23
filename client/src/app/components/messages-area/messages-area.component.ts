import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { AuthenticationService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ChatService } from '../../services/chat.service';
import { MessageService } from '../../services/message.service';
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
  user = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      displayName: 'the_mighty_jane',
      status: 'Online',
      phone: '751234567',
      bio: 'A bunch of words written here. A bunch of words written here. A bunch of words written here.',
    }
  ];
  room: string;
  message: string;
  showEditUserForm: boolean;
  messages: Message[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authenticationService: AuthenticationService,
    private chatService: ChatService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
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

    // this.searchForm = this.formBuilder.group({
    //   searchWord: [''],
    // });

    this.messageForm = this.formBuilder.group({
      message_body: [''],
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

  /**
   * Sends a message to all users in the room
   */
  // sendMessage() {
  //   this.chatService.sendMessage(
  //     {
  //       user: this.user,
  //       room: this.room,
  //       message: this.message
  //     });
  // }

  sendMessage() {
    this.messageService.postMessage(this.messageForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onSearch() {
  }

  closeEditUser() {
    document.getElementById('edit-user-form').style.display = 'none';
    document.getElementById('myModal').style.display = 'none';
  };

}
