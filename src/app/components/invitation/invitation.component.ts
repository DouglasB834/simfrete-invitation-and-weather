import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotateRight, faSpinner, faPhone, faMailBulk, faMapLocation} from '@fortawesome/free-solid-svg-icons';

interface InvitationData {
  name?: string;
  age?: number;
  phone?: string;
  email?: string;
  address?: string;
  address_number?: string;
  neighborhood?: string;
  city?: string;
  date?: string;
  message?: string;
  image?: string;
}
@Component({
  selector: 'app-invitation',
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule ],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css',
  // standalone: true //padrao true
})

export class InvitationComponent {
  changeIcon = faRotateRight ;
  spinnerIcon = faSpinner ;
  phoneIcon = faPhone;
  emailIcon = faMailBulk;
  mapIcon = faMapLocation;
  invitationForm: FormGroup;
  showModal = false;
  invitationData: InvitationData | null = {};
  urlImg = signal("https://picsum.photos/400/120");
  isLoading = false;

  constructor(private fb: FormBuilder) {


    this.invitationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      age: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      phone: ["", [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      email: ["", [Validators.required, Validators.email]],
      //2
      address: ["", [Validators.required, Validators.minLength(3)]],
      number: ["", Validators.required],
      neighborhood: ["", [Validators.required, Validators.minLength(3)]],
      city: ["", [Validators.required, Validators.minLength(3)]],
      date: ["", [Validators.required, this.futureDateValidator]],
      message: ["", [Validators.required, Validators.minLength(10)]],
    })
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  }

  onSubmit() {
    if(this.invitationForm.valid){
      const formValue = this.invitationForm.value;
      formValue.image = this.urlImg();
      formValue.age = Number(formValue.age);
      this.invitationData = formValue;
      this.showModal = true;

    }else{
      console.log(this.invitationForm.value, "formulario invalido ");
      console.log(this.invitationForm.valid, "formulario invalido ");
    }

  }

  closeModal() {
    this.showModal = false;
  }

  getImg() {
    this.isLoading = true
    try {
      const newImgUrl = `https://picsum.photos/400/120?t=${Date.now()}`;
      const img = new Image();
      img.src = newImgUrl;

      img.onload = () => {
        this.urlImg.set(newImgUrl);
      };
      console.log(this.isLoading )
      img.onerror = (error) => {
        console.error("Erro ao carregar a imagem:", error);
        this.isLoading = false;
      };
      // this.urlImg.update(_ => `https://picsum.photos/400/120?t=${Date.now()}`);
    } catch (error) {
      console.log("Me perdi no caminho tente novamente: Error", error)
    }finally{
      this.isLoading = false
    }
  }

  editInvitation() {
    this.showModal = false;
  }

  sendInvitation() {
    this.invitationForm.reset();
    alert('Convite enviado com sucesso!');
    this.closeModal();
  }

}
