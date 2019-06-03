/**
 * @File Name          : CustomWrapper.cls
 * @Description        : 
 * @Author             : wdt_sudikrt
 * @Group              : 
 * @Last Modified By   : wdt_sudikrt
 * @Last Modified On   : 6/3/2019, 11:52:10 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    6/3/2019, 11:52:10 PM   wdt_sudikrt     Initial Version
**/
public with sharing class CustomWrapper {
    public CustomWrapper() {

    }
    class InnerWrapper {
        @AuraEnabled
        public Integer someInnerInteger {get; set;}
        @AuraEnabled
        public String someInnerString {get; set;}
    }

    @AuraEnabled
    public String someInteger {get; set;}
    @AuraEnabled
    public String someString {get; set;}
    @AuraEnabled
    public List<InnerWrapper> someList {get; set;}
}
