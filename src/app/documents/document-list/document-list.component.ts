import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documentsList: Document[];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {}
  
  ngOnInit() {
    this.documentsList = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documentsList = documentsList;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}