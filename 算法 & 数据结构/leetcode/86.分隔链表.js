/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  var root1, root2, p1, p2, p
  root1 = p1 = new ListNode()
  root2 = p2 = new ListNode()
  p = head

  while (p !== null) {
    if (p.val < x) {
      p1.next = p
      p1 = p1.next
    } else {
      p2.next = p
      p2 = p2.next
    }
    var temp = p.next
    p.next = null
    p = temp
  }
  p1.next = root2.next
  return root1.next
}
// @lc code=end
