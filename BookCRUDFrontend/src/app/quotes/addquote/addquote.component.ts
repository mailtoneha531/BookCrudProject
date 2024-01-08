import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AlertService } from '@app/_services';
import { QuoteService } from '@app/_services/quote.service';
import { ThemeService } from '@app/_services/theme.service';


@Component({
  selector: 'app-addquote',
  templateUrl: './addquote.component.html',
  styleUrls: ['./addquote.component.css']
})
export class AddquoteComponent implements OnInit {
    form!: FormGroup;
    QuoteTitle?: string;
    Liked?: boolean;
    title?: string;
    loading = false;
    submitting = false;
    submitted = false;
    isFieldDisabled = true;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private quoteService: QuoteService,
        private alertService: AlertService,
        private themeService: ThemeService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            QuoteTitle: ['', Validators.required],
            Liked: ['', Validators.required]
        });
        this.title = 'Add Quote';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveQuote()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Quote saved', true);
                    this.router.navigateByUrl('/quotes');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveQuote() {
        //const  contextUser = localStorage.getItem("user");
        const  contextUser = JSON.parse(localStorage.getItem('user') || '{}');
        //return this.quoteService.saveQuote({...this.form.value, userId: contextUser.id});
        return this.quoteService.saveQuote(this.form.value);
    }

    toggleTheme() {
        this.themeService.toggleTheme();
      }
    
      getTheme() {
        return this.themeService.getTheme();
      }
    
      getButtonColor() {
        return this.getTheme() === 'dark' ? 'var(--button-primary)' : 'var(--button-light)';
      }

      getBackgroundColor() {
        return this.getTheme() === 'dark' ? 'var(--background-light)' : 'var(--background-lightdark)';
      }
    
      getTextColor() {
        return this.getTheme() === 'dark' ? 'var(--text-light)' : 'var(--text-dark)';
      }
}