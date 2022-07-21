pragma solidity>= 0.8.0;
pragma experimental ABIEncoderV2;
import  "./IOUtoken.sol";
/**

Alice, the artist, and designer with, a beautiful hairstyle, participates in a tender of Bob, the owner of several barbershops. She is young and ambitious but is a newbie in barbershops interior design. Bob doubts  Alice has enough experience and resources to  redesign all of his saloons. To ensure Bob of her ability,
1. Alice emits for this project SureIOU tokens with amount, date & time of mature and asks her friends and partners for surety: photographer Phil, decorator Denniz, carpenter Calvin.
1.1. Alice transfers them (to SuretyIOU contract?) her _own_ IOUs tokens (not this project SureIOU), equivalent in her amount of work, to ensure them that she will fullfill  her responsibilities to Bob.
1.2. Phil, Dennis, and Calvin decide to support Alice with this project and transfer their IOUs to Alice’s SureIOU in the amount of work, they  pledge for Bob’s project.
2. Alice transfers SureIOU to Bob’s security deposit,
2.1. he sees all sureties of the project and decides to hire Alice,
2.2. transfer prepay to her.
3. Then Alice goes to suppliers of repair products and pays for their goods with this SureIOU tokens.
4. When they successfully finished work, Bob pays them money (or his IOUs tokens) and
5. Bob burns  SureIOUs provided by Alice.
6. Alice pays
6.1. to team their reward
6.2. to supplier Stephan
7. Final
7.1. teammates  burn Alice’s IOUs and rate work win her
7.2. Supplier Stephan  burn SureIOUs that he  holds too and rate this work too.

8. If at maturity date & time this SureIOU doesn't burned by the client (holder of this SureIOU), he/she can get in proportion IOUs, deposited by sureties, and, if unsatisfied, set bad reputation marks to sureties/guarantees. So, Bob or suppliers can break the reputation of all team members.
9. If Alice doesn’t execute the agreement with the team, they can drop down her rating using her IOUs tokens (red lines)

 */

contract SuretyIOU is IOUtoken {

   
}