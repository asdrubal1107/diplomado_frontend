import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidatorService } from 'src/app/validators/password-validator.service';
import { NotificationsService } from '../../services/notifications.service';
import { ModalComponent } from 'src/app/widgets/modal/modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  passwordForm: FormGroup;

  profilePhoto: string = ""; // Default or current profile photo
  fullName: string = '';
  userName: string = '';
  userEmail: string = '';
  phone: string = '';
  userAddress: string = '';

  user: any;

  @ViewChild('changePasswordModal', {static: false}) changePasswordModal!: ModalComponent;

  constructor(private authService: AuthService,
              private apiService: ApiService,
              private fb: FormBuilder,
              private passwordValidator: PasswordValidatorService,
              private notificationsService: NotificationsService
  ) { 
    this.passwordForm = this.fb.group({
      actuallyPassword: ['', Validators.required, [this.passwordValidator]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {

    this.user = this.authService.usuario

    if (this.user.image) {
      this.profilePhoto = 'http://localhost:8081/uploads/institutions/' + this.user.image
    }
    else {
      this.profilePhoto = "";
    }

    this.fullName = this.user.name;
    this.userName = this.user.userName;
    this.userEmail = this.user.email;
    this.phone = this.user.phone;
    this.userAddress = this.user.address;

  }

  // Save profile function
  saveProfile() {

    const body = {
      phone: this.phone,
      address: this.userAddress,
    }; 

    this.apiService.put('users', this.authService.usuario._id, body).subscribe({
      next: (data) => {
          this.notificationsService.success('Usuario actualizado');
          localStorage.setItem('user', JSON.stringify(data.user));
          this.authService.usuario = data.user;
      },
      error: (err) => {
        this.notificationsService.error('Error al actualizar el usuario');
        console.log(err);
      },
    })

  }

  // Change password
  changePassword() {
    this.changePasswordModal.openModal();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('photoInput') as HTMLInputElement;
    fileInput.click(); // Simula el clic en el input file
  }
  
  onPhotoSelected(event: any) {

    const file = event.target.files[0];

    if (file) {
  
      // Aquí puedes enviar el archivo al backend
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', this.user.id);
  
      // Llamada al servicio para guardar la foto
      this.apiService.post('users/uploadImage', formData).subscribe({
        next: (data: any) => {

          localStorage.setItem('user', JSON.stringify(data.user));
          this.authService.usuario = data.user;

          if (data.user.image) this.profilePhoto = 'http://localhost:8081/uploads/institutions/' + data.user.image;
        },
        error: (err: any) => console.error('Error al subir la foto:', err)
      });
    }
  }

  // Delete profile picture
  deletePhoto() {
    this.apiService.post('users/deleteImage', {userId: this.user.id}).subscribe({
      next: (data) => {
        
        localStorage.setItem('user', JSON.stringify(data.user));
        this.authService.usuario = data.user;
        
        this.profilePhoto = "";
      },
      error : (err) => {
          console.log(err);
      },
    })
  }

  formInvalid(form: string) {
    return this.passwordForm.get(form)?.invalid && this.passwordForm.get(form)?.touched 
  }

  getErrorMessage(controlName: string) {

    const errors: any = this.passwordForm.get(controlName)?.errors;

    if (errors?.required) return 'Campo Requerido';
    if (errors?.minLength) return 'Debe tener al menos 8 caracteres'
    if (errors?.passwordNoExist) {
      return 'Contraseña Incorrecta'
    }
    else{
      return ''
    }

  }

  saveNewPassword() {

    if (this.passwordForm.invalid) {
      this.notificationsService.warning('Formulario invalido');
      return;
    }

    const body = {
      password: this.passwordForm.get('newPassword')?.value,
    }; 

    this.apiService.put('users', this.authService.usuario._id, body).subscribe({
      next: (value) => {
          this.notificationsService.success('Contraseña actualizada');
          this.passwordForm.reset();
      },
      error: (err) => {
        this.notificationsService.error('Erro al actualizar la contraseña');
        console.log(err);
      },
    })

  }
  
}
