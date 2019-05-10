/**
 * @File Name          : AccountContactController.cls
 * @Description        : 
 * @Author             : wdt_sudikrt
 * @Group              : 
 * @Last Modified By   : wdt_sudikrt
 * @Last Modified On   : 5/10/2019, 7:27:47 AM
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
}
