import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { BookService } from '@app/_services/book.service ';

@Component({
  selector: 'app-addeditbook',
  templateUrl: './addeditbook.component.html',
  styleUrls: ['./addeditbook.component.css']
})
export class AddeditbookComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    publicationDate: Date = new Date();
    loading = false;
    submitting = false;
    submitted = false;
    isFieldDisabled = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private bookService: BookService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            publicationDate: ['', Validators.required],   
        });

        this.title = 'Add Book';
        if (this.id) {
            // edit mode
            this.title = 'Edit Book';
            this.loading = true;
            this.bookService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
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
        this.saveBook()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Book saved', true);
                    this.router.navigateByUrl('/books');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveBook() {
        // create or update user based on id param
        return this.id
            ? this.bookService.update(this.id!, this.form.value)
            : this.bookService.saveBook(this.form.value);
    }
}