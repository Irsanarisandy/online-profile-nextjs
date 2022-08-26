Feature: Common Content

  Scenario Outline: Check Feed Links
    Given user is offline
    When user clicks on feed menu button
    Then user can see <type> feed in menu
    When user generate <type> feed
    Then user downloads <type> feed file

    Examples:
      | type |
      | Atom |
      | JSON |
      | RSS |

  Scenario: Check Links from API
    Given links API is valid

  Scenario: Check Theme Toggle Functionality
    Given user is offline
    When user toggle theme
    Then page theme changes
    When user toggle theme
    Then page theme changes
