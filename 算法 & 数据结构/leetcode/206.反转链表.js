/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 递归法
// var reverseList = function (head) {
//   if (head === null || head.next === null) {
//     return head
//   }
//   const last = reverseList(head.next)
//   head.next.next = head
//   head.next = null
//   return last
// }
// 迭代法
var reverseList = function (head) {
  let pre = null,
    cur = head,
    next = null
  while (cur !== null) {
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
// @lc code=end
