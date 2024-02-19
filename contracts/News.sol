// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SourceTrackingContract {
    // event Verify(string newsURL, string sourceURL, string state);
    event Upload(string newsURL, string sourceURL, uint256 newsId, address provider);
    // event GetURLs(string newsURL, string sourceURL, address provider);
    // event GetVotes(uint256 approve, uint256 deny);
    event NewsApproved(uint256 newsId);
    event NewsDenied(uint256 newsId);
    event Receive(address provider, uint256 amount);
    event Withdraw(address receiver, uint256 amount);
    event Reward(address receiver, uint256 amount);
    event Level(uint256 level, uint256 mistake);
    event AccountAuthorized(address account);

    enum newsState {CHECKING, APPROVED, DENIED}

    struct News {
        uint256 newsId;
        string newsURL;
        string sourceURL;
        uint256 approve;
        uint256 deny;
        address[] approveList;
        address[] denyList;
        newsState state;
    }

    uint256 totalNews;
    address manager;

    mapping(uint256 => News) _news;
    mapping(uint256 => address) _providers;
    mapping(uint256 => mapping(address => bool)) _isVoted;
    mapping(address => uint256) _givenEther;
    mapping(address => uint256[2]) _voterLevel; // level, mistakes
    mapping(address => bool) _isAuthorized;
    // newsId => voterAddress => isVoted

    constructor() payable {
        totalNews = 0;
        manager = msg.sender;
        _isAuthorized[manager] = true;
    }

    receive() external payable {
        _givenEther[msg.sender] += msg.value;
        emit Receive(msg.sender, msg.value);
    }

    function testHello() view public returns(uint256 number, address user) {
        return(100, msg.sender);
    }
  
    function test2() pure public {
        uint happy = 0;
        happy += 1;
    }

    function test3(uint k) pure public {
        k += 1;
    }

    function test4(uint k) pure public returns(uint n) {
        return k+1;
    }


    function addAccount(address account) public {
        require(msg.sender == manager, "ERROR: only manager can add account.");
        require(!_isAuthorized[account], "ERROR: this account has been authorized.");
        _isAuthorized[account] = true;
        emit AccountAuthorized(account);
    }

    modifier onlyAuthorized() {
        require(_isAuthorized[msg.sender], "ERROR: only authorized account can access this function.");
        _;
    }

    function verify(uint256 newsId) view public returns(string memory state) {
        require(_providers[newsId] != address(0), "ERROR: newsId is invalid");

        if(_news[newsId].state == newsState.CHECKING)        
            return "Checking";
        else if(_news[newsId].state == newsState.APPROVED)
            return "Approved";
        else if(_news[newsId].state == newsState.DENIED)
            return "Denied";
    }

    function getLevel() onlyAuthorized public returns(uint256 level, uint256 mistake) {
        emit Level(_voterLevel[msg.sender][0], _voterLevel[msg.sender][1]);
        return (_voterLevel[msg.sender][0], _voterLevel[msg.sender][1]);
    }

    function getBalance() onlyAuthorized view public returns(uint256 balance) {
        return _givenEther[msg.sender];
    }

    function withdraw(uint256 amount) onlyAuthorized public {
        
        require(amount <= _givenEther[msg.sender], "ERROR: not enough ether");
        _withdraw(amount);
    }

    function withdrawAll() onlyAuthorized public {
        _withdraw(_givenEther[msg.sender]);
    }

    function _withdraw(uint256 amount) internal {
        address payable Receiver = payable(msg.sender);
        require(Receiver.send(amount), "ERROR: operation failed");
        _givenEther[Receiver] -= amount;
        emit Reward(Receiver, amount);
    }
    
    function upload(string memory newsURL_, string memory sourceURL_) onlyAuthorized public returns (uint256 newsId) {
        uint256 _newsId = ++totalNews;
        _providers[_newsId] = msg.sender;
        _news[_newsId] = News(_newsId, newsURL_, sourceURL_, 0, 0, new address[](0), new address[](0), newsState.CHECKING);
        require(_givenEther[msg.sender] >= 1 ether, "ERROR: not enough ether to upload");
        _givenEther[msg.sender] -= 1 ether;
        // emit Upload(newsURL_, sourceURL_, _newsId, _providers[_newsId]);
        return _newsId;
    }

    function managerUpload(string memory newsURL_, string memory sourceURL_) onlyAuthorized public returns (uint256 newsId) {
        require(msg.sender == manager, "ERROR: only manager can access this function.");
        uint256 _newsId = ++totalNews;
        _providers[_newsId] = msg.sender;
        _news[_newsId] = News(_newsId, newsURL_, sourceURL_, 0, 0, new address[](0), new address[](0), newsState.CHECKING);
        return _newsId;
    }

    function getURLs(uint256 newsId_) view public returns (string memory newsURL, string memory sourceURL) {
        require(_providers[newsId_] != address(0), "ERROR: newsId is invalid");
        return (_news[newsId_].newsURL, _news[newsId_].sourceURL);
    }

    function getVotes(uint256 newsId_) view public returns (uint256 approve, uint256 deny) {
        require(_providers[newsId_] != address(0), "ERROR: newsId is invalid");
        return (_news[newsId_].approve, _news[newsId_].deny);
    }

    function vote(uint256 newsId, bool approve) onlyAuthorized public {
        address voter = msg.sender;
        require(_providers[newsId] != address(0), "ERROR: newsId is invalid");
        require(voter != _providers[newsId], "ERROR: provider cannot vote");
        require(!_isVoted[newsId][voter], "ERROR: you have voted");
        require(_news[newsId].state == newsState.CHECKING, "ERROR: vote has ended");
        if(approve) {
            ++_news[newsId].approve;
            _news[newsId].approveList.push(voter);
        } else {
            ++_news[newsId].deny;
            _news[newsId].denyList.push(voter);
        } 
        _isVoted[newsId][voter] = true;
// test
        if(_news[newsId].approve + _news[newsId].deny == 2) _checkVotes(newsId);
    }
    
    function _checkVotes(uint256 newsId) internal {
// test
        if(_news[newsId].approve >= 1) {
            _news[newsId].state = newsState.APPROVED;
            if(_providers[newsId] != manager)   _givenEther[_providers[newsId]] += 0.7 ether;
            for(uint256 i = 0 ; i < _news[newsId].approve ; i++) {
                // level
                if(++_voterLevel[_news[newsId].approveList[i]][0] >= 5) {
                    _givenEther[_news[newsId].approveList[i]] += 0.001 ether;
                    emit Reward(_news[newsId].approveList[i], 0.001 ether);
                }
                // mistakes
                _voterLevel[_news[newsId].approveList[i]][1] = 0;
            }
            for(uint256 i = 0 ; i < _news[newsId].deny ; i++) {
                // mistakes
                if(++_voterLevel[_news[newsId].denyList[i]][1] == 3) {
                    _voterLevel[_news[newsId].denyList[i]][0] = 0;  // level set to 0
                    _voterLevel[_news[newsId].denyList[i]][1] = 0;  // mistake set to 0
                }
            }
            emit NewsApproved(newsId);
        } else {
            _news[newsId].state = newsState.DENIED;
            for(uint256 i = 0 ; i < _news[newsId].deny ; i++) {
                // level
                if(++_voterLevel[_news[newsId].denyList[i]][0] >= 5) {
                     if(++_voterLevel[_news[newsId].denyList[i]][0] >= 5) {
                        _givenEther[_news[newsId].denyList[i]] += 0.001 ether;
                        emit Reward(_news[newsId].denyList[i], 0.001 ether);
                    }
                }
                // mistakes
                _voterLevel[_news[newsId].denyList[i]][1] = 0;
            }
            for(uint256 i = 0 ; i < _news[newsId].approve ; i++) {
                // mistakes
                if(++_voterLevel[_news[newsId].approveList[i]][1] == 3) {
                    _voterLevel[_news[newsId].approveList[i]][0] = 0;  // level set to 0
                    _voterLevel[_news[newsId].approveList[i]][1] = 0;  // mistake set to 0
                }
            }
            emit NewsDenied(newsId);
            // delete _providers[newsId];
            // delete _news[newsId];
        }
    }
}