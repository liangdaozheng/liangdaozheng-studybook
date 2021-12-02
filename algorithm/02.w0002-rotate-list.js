/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
//  var rotateRight = function(head, k) {
//   if (k === 0 || !head || !head.next) {
//       return head;
//   }
//   let n = 1;
//   let cur = head;
//   while (cur.next) {
//       cur = cur.next;
//       n++;
//   }

//   let add = n - k % n;
//   if (add === n) {
//       return head;
//   }

//   cur.next = head;
//   while (add) {
//       cur = cur.next;
//       add--;
//   }

//   const ret = cur.next;
//   cur.next = null;
//   return ret;
// };


// console.log(rotateRight([1,2,2,3,4],3))
