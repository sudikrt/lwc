/**
 * @File Name          : AccountContactController.cls
 * @Description        : 
 * @Author             : wdt_sudikrt
 * @Group              : 
 * @Last Modified By   : wdt_sudikrt
 * @Last Modified On   : 6/5/2019, 8:14:04 AM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    5/7/2019, 11:39:23 PM   wdt_sudikrt     Initial Version
**/
public with sharing class AccountContactController {
    public AccountContactController() {

    }

    @AuraEnabled (cacheable = true)
    public static List<Account> getAccountContactList(){
        return [SELECT id, Name, (SELECT id, Name from Contacts) from Account];
    }
    
    @AuraEnabled (cacheable = true)
    public static Contact getSingleContact(){
        return [SELECT Id, Name from Contact WHERE Name = 'RAX' LIMIT 1];
    }

    @AuraEnabled (cacheable = true)
    public static List<Account> getAccountList(){
        return [SELECT id, Name from Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String searchKey) {
        if (String.isBlank(searchKey)) {
            return new List<Contact>();
        }
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Title, Phone, Email  FROM Contact WHERE Name LIKE :key  LIMIT 10];
    }
}
