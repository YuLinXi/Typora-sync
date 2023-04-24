/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(-1)
  dummy.next = head
  var p1 = dummy
  for (var i = 0; i < n + 1; i++) {
    p1 = p1.next
  }
  var p2 = dummy
  while (p1 !== null) {
    p1 = p1.next
    p2 = p2.next
  }
  p2.next = p2.next.next
  return dummy.next
}

// @lc code=end
