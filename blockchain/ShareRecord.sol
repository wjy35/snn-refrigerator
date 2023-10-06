// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract ShareRecord{
    struct Share {
        uint256 giver;
        uint256 taker;
        string time;
    }

    event shareInfo(uint256 indexed giver, uint256 indexed taker,string indexed time);

    mapping(uint256 => Share[]) public shareHistory; // 나눔 내역
    mapping(uint256 => Share[]) public takeHistory; // 받은 내역


    function completeSharing(uint256 _giver, uint256 _taker, string memory _time) public returns(uint256) { // 약속 잡을때 초기 설정
        Share memory newShare = Share(_giver, _taker, _time);
        shareHistory[_giver].push(newShare);
        takeHistory[_taker].push(newShare);
        emit shareInfo(_giver,_taker,_time);
        return 0;
    }

    function getShareRecord(uint256 _giver) public view returns (Share[] memory) {
        require(0 < shareHistory[_giver].length, "Invalid index");
        return shareHistory[_giver];
    }
    function getTakeRecord(uint256 _taker) public view returns (Share[] memory) {
        require(0 < takeHistory[_taker].length, "Invalid index");
        return takeHistory[_taker];
    }
}