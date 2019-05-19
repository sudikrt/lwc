/**
 * @File Name          : LookupController.cls
 * @Description        : 
 * @Author             : wdt_sudikrt
 * @Group              : 
 * @Last Modified By   : wdt_sudikrt
 * @Last Modified On   : 5/18/2019, 5:12:44 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    5/18/2019, 10:13:17 AM   wdt_sudikrt     Initial Version
**/
public with sharing class LookupController {

    public class SobjectNotFoundException extends Exception {}
    public class FieldNotFoundException extends Exception {}
    public LookupController() {

    }

    private static SObjectType getSobject (String sObjectApiName) {
        SObjectType objectType  = Schema.getGlobalDescribe().get(sObjectApiName);
        if (objectType == null) {
            throw new SobjectNotFoundException ('Invalid sObjectApi aame');
        }
        return objectType;
    }

    private static String getFieldsString (List<String> fields, SObjectType objectType, String title, String subTitle) {
        Set<String> fieldsSet = new Set<String> (fields);

        if (! (fieldsSet.contains('Id') || fieldsSet.contains('id') && fieldsSet.contains('ID'))) {
            fieldsSet.add  ('Id');
        }

        fieldsSet.add (title);
        fieldsSet.add (subTitle);

        Map<String,Schema.SObjectField> mfields = objectType.getDescribe().fields.getMap();
        String fieldStr = '';
        Integer index = 0;
        for (String item : fieldsSet) {
            index ++;
            if (!mfields.containsKey(item)) {
                throw new FieldNotFoundException ('Invalid field :' + item);
            }
            fieldStr += item;

            if (index != fieldsSet.size()) {
                fieldStr += ',';
            }
        }
        return fieldStr;
    }

    @AuraEnabled(Cacheable=true)
    public static List<LookupSearchResult> search(String searchTerm, List<String> selectedIds, String sObjectApiName, List<String> fields, String title, String subTitle, Integer limitVal, String iconName) {
        // Sanitze the input
        String sanitizedSearchString = String.escapeSingleQuotes(searchTerm);
        String sanitizedSObjectAPIName = String.escapeSingleQuotes(sObjectApiName);

        if (String.isBlank(iconName)) {
            iconName = 'standard:account';
        }
 
        SObjectType objectType = getSobject (sanitizedSObjectAPIName);
        String fieldsStr = getFieldsString (fields, objectType, title, subTitle);

        String searchQuery = 'FIND \'' + sanitizedSearchString + '*\' IN ALL FIELDS RETURNING ' + sanitizedSObjectAPIName + '(' + fieldsStr + ') Limit ' + limitVal ;

        List<List<SObject>> searchList = search.query(searchQuery);

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        for (SObject eachSobj : searchList[0]) {
            results.add(new LookupSearchResult((Id) eachSobj.get ('Id'), sanitizedSObjectAPIName, iconName, (String) eachSobj.get (title), (String) eachSobj.get (subTitle), eachSobj));
        }

        return results;
    }
}
