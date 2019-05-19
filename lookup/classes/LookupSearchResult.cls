/**
 * @File Name          : LookupSearchResult.cls
 * @Description        : 
 * @Author             : wdt_sudikrt
 * @Group              : 
 * @Last Modified By   : wdt_sudikrt
 * @Last Modified On   : 5/18/2019, 3:44:18 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    5/17/2019, 11:26:35 PM   wdt_sudikrt     Initial Version
**/
public with sharing class LookupSearchResult {

    private Id id;
    private String sObjectType;
    private String icon;
    private String title;
    private String subtitle;
    private sObject sObj;

    public LookupSearchResult(Id id, String sObjectType, String icon, String title, String subtitle) {
        this.id = id;
        this.sObjectType = sObjectType;
        this.icon = icon;
        this.title = title;
        this.subtitle = subtitle;
    }

    public LookupSearchResult(Id id, String sObjectType, String icon, String title, String subtitle, SObject sObj) {
        this.id = id;
        this.sObjectType = sObjectType;
        this.icon = icon;
        this.title = title;
        this.subtitle = subtitle;
        this.sObj = sObj;
    }

    @AuraEnabled
    public Id getId() {
        return id;
    }

    @AuraEnabled
    public String getSObjectType() {
        return sObjectType;
    }

    @AuraEnabled
    public String getIcon() {
        return icon;
    }

    @AuraEnabled
    public String getTitle() {
        return title;
    }

    @AuraEnabled
    public String getSubtitle() {
        return subtitle;
    }

    @AuraEnabled
    public SObject getSobj(){
        return sObj;
    }
}
