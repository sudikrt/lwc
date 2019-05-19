/**
 * @File Name          : LookupControllerTest.cls
 * @Description        : 
 * @Author             : wdt_sudikrt
 * @Group              : 
 * @Last Modified By   : wdt_sudikrt
 * @Last Modified On   : 5/19/2019, 8:55:31 AM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    5/19/2019, 1:15:14 AM   wdt_sudikrt     Initial Version
**/
@isTest
public with sharing class LookupControllerTest {
    @TestSetup
    static void makeData(){
        List<Account> accList = new List<Account> ();
        for (Integer i = 0; i < 10 ; i ++) {
            accList.add (new Account (Name = 'Name ' + i));
        }
        insert accList;
    }

    @IsTest
    static void method_sObjectAPI(){
        Id [] fixedResults = new Id[1];
        fixedResults.add ([SELECT Id from Account LIMIT 1].Id);

        Test.startTest();
        List<String> selectedIds = new List<String>();
        try {
            List<LookupSearchResult> results = LookupController.search('Name 1', selectedIds, 'Account__c', new List<String> (), '', '', 1, null);
        } catch (Exception ex) {

        }
        
        

        Test.stopTest();
        
    }

    @IsTest
    static void method_filed_1(){
        Id [] fixedResults = new Id[1];
        fixedResults.add ([SELECT Id from Account LIMIT 1].Id);

        Test.startTest();
        List<String> selectedIds = new List<String>();

        try {
            List<LookupSearchResult> results = LookupController.search('Name 1', selectedIds, 'Account', new List<String> (), 'Name__c', '', 1, null);
        } catch (Exception e) {

        }

        Test.stopTest();
        
    }
    @IsTest
    static void method_filed_2(){
        Id [] fixedResults = new Id[1];
        fixedResults.add ([SELECT Id from Account LIMIT 1].Id);

        Test.startTest();
        List<String> selectedIds = new List<String>();

        try {
           List<LookupSearchResult> results = LookupController.search('Name 1', selectedIds, 'Account', new List<String> (), 'Name', 'Phone__c', 1, null);
        }catch (Exception e) {

        }
        Test.stopTest();
    }
    @IsTest
    static void method_filed_3(){
        Id [] fixedResults = new Id[1];
        fixedResults.add ([SELECT Id from Account LIMIT 1].Id);
        Test.setFixedSearchResults(fixedResults);
        Test.startTest();

        new LookupController ();

        List<String> selectedIds = new List<String>();

        List<LookupSearchResult> results = LookupController.search('Name 1', selectedIds, 'Account', new List<String> (), 'Name', 'Phone', 5, null);
        
        for (LookupSearchResult res : results) {
            new LookupSearchResult (res.getId(), 'Account', 'strandard:account', res.getTitle(), res.getSubtitle());
            System.debug(res.getIcon());
            System.debug(res.getId());
            System.debug(res.getSobj());
            System.debug(res.getSObjectType());
            System.debug(res.getSubtitle());
            System.debug(res.getTitle());
        }

        Test.stopTest();
        
    }
}
