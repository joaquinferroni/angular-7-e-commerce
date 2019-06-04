import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { FormControl } from '@angular/forms';
import { AccountResumeService } from '../_services/account-resume.service';
import { AccountResume } from '../_entities/account-resume.entity';

@Component({
  selector: 'app-account-resume',
  templateUrl: './account-resume.component.html',
  styleUrls: ['./account-resume.component.scss']
})
export class AccountResumeComponent implements OnInit {

  loading = true;
  resumes = new Array<AccountResume>();
  displayedColumns: string[] = ['date', 'receipt',  'debit' , 'credit', 'sum'];
  from = new FormControl(new Date());
  to =  new FormControl(new Date());
  ivaCondition: number;

  constructor(
    private router: Router,
    private accountResumeService: AccountResumeService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    this.from.value.setDate(0);
    this.from.value.setDate(1);
    this.ivaCondition = this.loginService.currentUserValue.paymentConditionId;

  }

  ngOnInit() {
    this.loadAccountResumes();
  }

  loadAccountResumes() {
    this.loading = true;
    this.accountResumeService.GetAccountResumes(this.from.value, this.to.value).subscribe(
      (data) => {
        this.loading = false;
        this.resumes = data;
      }
    );
  }


  fromChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.from.setValue(event.value);
  }

  toChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.to.setValue(event.value);
  }

  getValidDate( value: string): string {
    if (!value) {
      return '';
    }
    const formatted = new Date(value);
    return formatted.toLocaleDateString();
  }

  backToList() {
    this.router.navigate(['/menu/products-list'] , {queryParams: this.route.snapshot.queryParams});
  }





}
