/**
 * @File Name          : ApexTypesController.cls
 * @Description        : 
 * @Author             : wdt_sudikrt
 * @Group              : 
 * @Last Modified By   : wdt_sudikrt
 * @Last Modified On   : 6/3/2019, 11:50:27 PM
 * @Modification Log   : 
 *==============================================================================
 * Ver         Date                     Author      		      Modification
 *==============================================================================
 * 1.0    6/3/2019, 11:50:27 PM   wdt_sudikrt     Initial Version
**/
public with sharing class ApexTypesController {
    public ApexTypesController() {

    }
    @AuraEnabled
    public static String checkApexTypes(CustomWrapper wrapper) {
        // Using System.debug() isn't good practice for production applications.
        // It's used here to showcase how the received data looks like in Apex.
        System.debug(wrapper);
        // The values are based on the data that is defined in the
        // apexImperativeMethodWithComplexParams Lightning web component.
        String response = 'You entered "' + wrapper.someString + '" as String, and "' 
                          + wrapper.someInteger + '" as Integer value. The list contained '
                          + wrapper.someList.size() + ' items.'; 
        return response;
    }
}
