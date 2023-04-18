/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  var root = new ListNode()
  var current = root
  var p1 = list1
  var p2 = list2
  while (p1 !== null && p2 !== null) {
    if (p1.val > p2.val) {
      current.next = p2
      p2 = p2.next
    } else {
      current.next = p1
      p1 = p1.next
    }
    current = current.next
  }
  if (p1 !== null) {
    current.next = p1
  }
  if (p2 !== null) {
    current.next = p2
  }
  return root.next
}
// @lc code=end
