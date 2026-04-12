Feature: Ecommerce Validation
 //we can have multiple tags

   @ErrorValidation
   @foo
  Scenario: Placing an order
    Given a login to Ecommerce2 website application with username "<username>" and password "<password>"
    Then Verify Error message is displayed

    #we can pass multiple data using examples keyword and we can use the same scenario with different data sets
    Examples:
      | username        | password |
      | rahulshetty     | lear@123 |
      | yuva@gamail.com | lear     |