/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head === null) return head
  var start = head,
    end = head
  for (var i = 0; i < k; i++) {
    if (end === null) return head
    end = end.next
  }

  var newHead = reverseList(start, end)

  start.next = reverseKGroup(end, k)
  return newHead
}
var reverseList = function (start, end) {
  var pre = null,
    cur = start,
    next = null
  while (cur !== end) {
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
// @lc code=end
