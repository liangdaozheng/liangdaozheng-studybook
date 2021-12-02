
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
//  function ListNode(val, next) {
//   this.val = (val===undefined ? 0 : val)
//    this.next = (next===undefined ? null : next)
// }
//  var removeNthFromEnd = function(head, n) {
//   let ret = new ListNode(0, head),
//       slow = fast = ret;
//   while(n--) fast = fast.next;
//   if(!fast) return ret.next;
//   while (fast.next) {
//       fast = fast.next; 
//       slow = slow.next
//   };
//   slow.next = slow.next.next;
//   return ret.next;
// };

// console.log(removeNthFromEnd([1,2,2,3,4,5],4))
