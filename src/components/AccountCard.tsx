"use client";
import React from "react";
type AccountCardProps = {
  balance: number; // 금액 상태를 받아오기 위한 prop
};
const AccountCard: React.FC<AccountCardProps> = ({ balance }) => {
  return (
    <div className="bg-orange-400 text-white rounded-lg p-4 w-80 shadow-md relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-white text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">
            B
          </div>
          <span className="font-bold text-lg">대표자의 통장</span>
        </div>
      </div>
      {/* Balance View */}
      <div className="mb-4 text-lg font-bold">
        {balance.toLocaleString()}원
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2 mb-4">
        <button className="bg-orange-500 rounded-full px-4 py-2 text-sm">카드</button>
        <button className="bg-orange-500 rounded-full px-4 py-2 text-sm">이체</button>
      </div>
      {/* Divider */}
      <div className="border-t border-orange-300 mb-4"></div>
      {/* Account Info */}
      <div className="space-y-2">
        <div className="text-sm">세이프박스</div>
        <div className="text-sm">저금통</div>
      </div>
    </div>
  );
};
export default AccountCard;