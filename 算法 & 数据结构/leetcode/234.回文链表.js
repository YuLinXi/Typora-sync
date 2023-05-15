/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
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
 * @return {boolean}
 */
var isPalindrome = function (head) {
  var slow = head,
    fast = head
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
  }

  if (fast) {
    slow = slow.next
  }

  var left = head,
    right = reverse(slow)
  while (right !== null) {
    if (left.val !== right.val) return false
    left = left.next
    right = right.next
  }

  return true
}

var reverse = function (head) {
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
