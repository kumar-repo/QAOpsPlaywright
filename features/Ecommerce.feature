Feature: Ecommerce Validation
  //tags are used to categorize the scenarios and to run specific scenarios based on the tags
  @Regression
  Scenario: Placing an order
    Given a login to Ecommerce website application with username "yuvak@gmail.com" and password "Temp@123"
    When Add "ZARA COAT 3" to the cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and place the order
    Then verify the order is present in the order history


  @ErrorValidation
  Scenario: veifying error message for login with invalid credentials
    Given a login to Ecommerce2 website application with username "<username>" and password "<password>"
    Then Verify Error message is displayed

    #we can pass multiple data using examples keyword and we can use the same scenario with different data sets
    Examples:
      | username        | password |
      | rahulshetty     | lear@123 |
      | yuva@gamail.com | lear     |