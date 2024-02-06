import { Component, OnInit } from '@angular/core';
import { feeassigner } from 'src/app/services/feeassigner.service';
declare var RazorPay:any
@Component({
  selector: 'app-feeside',
  templateUrl: './feeside.component.html',
  styleUrls: ['./feeside.component.css']
})
export class FeesideComponent implements OnInit{
  index=0;
  fee:any[]=[]


  public id :string = ''
  ngOnInit(): void {
    this.id = localStorage.getItem("student_id") as string
    this.feelistdue()
  }

  constructor(private feelist:feeassigner){}


  feelistdue(){
    this.feelist.getFeeData(this.id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.fee=res
  },
    error:($error:any)=>{
      console.log("--->",$error)
    }

})}

  PayNow(amount:any, id:any){
   
    const Razorpayoptions = {
      description: 'Sample Payment',
      currency: 'INR',
      amount: 2000,
      name: 'test',
      image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
      key: 'rzp_test_lwlav4cxjCCLRq',
      prefill: {
        name: 'test',
        email: 'test@gmail.com',
        phone: '9998887775',
      },
      theme: {
        color: '#6466e3',
        display: 'block',
      },
      handler: (response: any) => {
 
        console.log('payment_id', response.razorpay_payment_id);
        // this.paymentid = response.razorpay_payment_id;
        // this.paymentInitialized = true;
 
    //     Swal.fire({
    //       position: 'top-end',
    //       title: 'Payment Successful',
    //       text:'Please register to continue',
    //       icon: 'success',
    //       timer: 1500,
    //       showConfirmButton: false,
    //       didOpen: () => {
    //         const SwalIcon = Swal.getIcon();
    //         if (SwalIcon) {
             
    //           SwalIcon.style.width = '80px';
    //           SwalIcon.style.height = '80px';
    //         }
    //         const SwalTitle = Swal.getTitle();
    //         if (SwalTitle) {
    //   SwalTitle.style.fontSize = '20px';
    // }
    //         const SwalModal = Swal.getPopup();
    //         if (SwalModal) {
    //           SwalModal.style.width = '360px';
    //           SwalModal.style.height = '250px';
    //         }
    //       },
    //     });
 
 
      },
      modal: {
        ondismiss: () => {
          alert('Payment Failed');
        },
      },
    };
 
    const successCallback = (payment_id: any) => {
      console.log('payment_id', payment_id);
    };
 
    const failureCallback = (error: any) => {
      console.log('error', error);
    };
 
    RazorPay.open(Razorpayoptions, successCallback, failureCallback);
  }
  }


