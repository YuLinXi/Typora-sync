/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  var p = removeElement(nums, 0)
  for (; p < nums.length; p++) {
    nums[p] = 0
  }
}

var removeElement = function (nums, val) {
  var fast = 0,
    slow = 0
  while (fast < nums.length) {
    if (nums[fast] != val) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
}
// @lc code=end
