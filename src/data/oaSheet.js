export const oaSheetStats = {
  totalProblems: 24,
  companiesCount: 10,
  topicsCount: 6,
  description: "Curated collection of high-frequency Online Assessment and technical interview problems frequently encountered by PICT students in product tier companies."
};

export const oaCompanies = [
  "All",
  "Google",
  "Microsoft",
  "Amazon",
  "Salesforce",
  "PhonePe",
  "Goldman Sachs",
  "DE Shaw",
  "Uber",
  "BNY Mellon"
];

export const oaTopics = [
  "All",
  "Two Pointers & Sliding Window",
  "Binary Search",
  "Dynamic Programming",
  "Graphs & Trees",
  "Stack & Heap",
  "Arrays & Hashing"
];

export const oaProblems = [
  {
    id: "oa-1",
    name: "Trapping Rain Water",
    platform: "LeetCode 42",
    problemUrl: "https://leetcode.com/problems/trapping-rain-water/",
    difficulty: "Hard",
    topic: "Two Pointers & Sliding Window",
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    badge: "Must Try",
    hint: "Maintain left_max and right_max pointers. The water level at any index is bounded by min(left_max, right_max). Move the smaller pointer inward.",
    editorialUrl: "https://leetcode.com/problems/trapping-rain-water/editorial/"
  },
  {
    id: "oa-2",
    name: "LRU Cache",
    platform: "LeetCode 146",
    problemUrl: "https://leetcode.com/problems/lru-cache/",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    companies: ["Amazon", "Microsoft", "Salesforce", "Google"],
    badge: "Top OA",
    hint: "Combine a hash map with a doubly linked list. The map provides O(1) key lookup, while the list maintains the recency order with O(1) removals and insertions.",
    editorialUrl: "https://leetcode.com/problems/lru-cache/editorial/"
  },
  {
    id: "oa-3",
    name: "Course Schedule II",
    platform: "LeetCode 210",
    problemUrl: "https://leetcode.com/problems/course-schedule-ii/",
    difficulty: "Medium",
    topic: "Graphs & Trees",
    companies: ["Google", "Amazon", "Uber"],
    badge: "Top OA",
    hint: "Use Kahn's algorithm (BFS with in-degrees) or DFS cycle detection. If the topological order contains all V vertices, a valid schedule exists.",
    editorialUrl: "https://leetcode.com/problems/course-schedule-ii/editorial/"
  },
  {
    id: "oa-4",
    name: "Median of Two Sorted Arrays",
    platform: "LeetCode 4",
    problemUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: "Hard",
    topic: "Binary Search",
    companies: ["Google", "Microsoft", "Goldman Sachs"],
    badge: "High Frequency",
    hint: "Binary search on the partition cut of the smaller array. Ensure left partition elements are <= right partition elements across both arrays in O(log(min(M, N))).",
    editorialUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/editorial/"
  },
  {
    id: "oa-5",
    name: "Longest Increasing Subsequence",
    platform: "LeetCode 300",
    problemUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Microsoft", "Amazon", "PhonePe", "DE Shaw"],
    badge: "Must Try",
    hint: "Solve in O(N log N) using patience sorting. Maintain tails array where tails[i] is the smallest tail of all increasing subsequences of length i+1, updated via std::lower_bound.",
    editorialUrl: "https://leetcode.com/problems/longest-increasing-subsequence/editorial/"
  },
  {
    id: "oa-6",
    name: "Word Break",
    platform: "LeetCode 139",
    problemUrl: "https://leetcode.com/problems/word-break/",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Salesforce", "Google"],
    badge: "Top OA",
    hint: "dp[i] = true if string s[0...i-1] can be segmented. For each j < i, check if dp[j] is true and s[j...i-1] exists in dictionary.",
    editorialUrl: "https://leetcode.com/problems/word-break/editorial/"
  },
  {
    id: "oa-7",
    name: "Rotting Oranges",
    platform: "LeetCode 994",
    problemUrl: "https://leetcode.com/problems/rotting-oranges/",
    difficulty: "Medium",
    topic: "Graphs & Trees",
    companies: ["Amazon", "Microsoft", "PhonePe"],
    badge: "High Frequency",
    hint: "Multi-source BFS. Push all initially rotten oranges into the queue at minute 0. Expand layer by layer tracking elapsed minutes.",
    editorialUrl: "https://leetcode.com/problems/rotting-oranges/editorial/"
  },
  {
    id: "oa-8",
    name: "Minimum Window Substring",
    platform: "LeetCode 76",
    problemUrl: "https://leetcode.com/problems/minimum-window-substring/",
    difficulty: "Hard",
    topic: "Two Pointers & Sliding Window",
    companies: ["Google", "Uber", "Amazon", "DE Shaw"],
    badge: "Must Try",
    hint: "Sliding window with frequency hash map. Expand right until all target characters are matched, then contract left to minimize window while invariant holds.",
    editorialUrl: "https://leetcode.com/problems/minimum-window-substring/editorial/"
  },
  {
    id: "oa-9",
    name: "Find Median from Data Stream",
    platform: "LeetCode 295",
    problemUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
    difficulty: "Hard",
    topic: "Stack & Heap",
    companies: ["Google", "Amazon", "Goldman Sachs"],
    badge: "Top OA",
    hint: "Maintain two heaps: max-heap for lower half and min-heap for upper half. Balance sizes so difference is at most 1.",
    editorialUrl: "https://leetcode.com/problems/find-median-from-data-stream/editorial/"
  },
  {
    id: "oa-10",
    name: "Search in Rotated Sorted Array",
    platform: "LeetCode 33",
    problemUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Microsoft", "Google", "Amazon", "BNY Mellon"],
    badge: "High Frequency",
    hint: "In any rotated sorted array, at least one half [low...mid] or [mid...high] is always sorted. Check if target lies within the sorted half.",
    editorialUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/editorial/"
  },
  {
    id: "oa-11",
    name: "Subarray Sum Equals K",
    platform: "LeetCode 560",
    problemUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    companies: ["Google", "Amazon", "Salesforce"],
    badge: "Top OA",
    hint: "Prefix sum with hash map storing frequency of seen prefix sums. If prefix_sum - k exists in map, add its frequency to total count.",
    editorialUrl: "https://leetcode.com/problems/subarray-sum-equals-k/editorial/"
  },
  {
    id: "oa-12",
    name: "Coin Change",
    platform: "LeetCode 322",
    problemUrl: "https://leetcode.com/problems/coin-change/",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Microsoft", "PhonePe", "Goldman Sachs"],
    badge: "Must Try",
    hint: "Bottom-up 1D DP: dp[i] = min(dp[i], dp[i - coin] + 1) initialized to infinity, with base case dp[0] = 0.",
    editorialUrl: "https://leetcode.com/problems/coin-change/editorial/"
  },
  {
    id: "oa-13",
    name: "Number of Islands",
    platform: "LeetCode 200",
    problemUrl: "https://leetcode.com/problems/number-of-islands/",
    difficulty: "Medium",
    topic: "Graphs & Trees",
    companies: ["Amazon", "Google", "Microsoft", "Salesforce"],
    badge: "Must Try",
    hint: "Iterate through 2D grid. When '1' is encountered, trigger DFS/BFS to sink all 4-directionally connected land cells and increment island count.",
    editorialUrl: "https://leetcode.com/problems/number-of-islands/editorial/"
  },
  {
    id: "oa-14",
    name: "Daily Temperatures",
    platform: "LeetCode 739",
    problemUrl: "https://leetcode.com/problems/daily-temperatures/",
    difficulty: "Medium",
    topic: "Stack & Heap",
    companies: ["Amazon", "Google", "PhonePe"],
    badge: "High Frequency",
    hint: "Monotonic decreasing stack storing indices. When current temp is higher than stack top, pop and record difference in indices.",
    editorialUrl: "https://leetcode.com/problems/daily-temperatures/editorial/"
  },
  {
    id: "oa-15",
    name: "Capacity To Ship Packages Within D Days",
    platform: "LeetCode 1011",
    problemUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Google", "Amazon", "BNY Mellon"],
    badge: "Top OA",
    hint: "Binary search on capacity in range [max(weights), sum(weights)]. Predicate check(cap) greedily verifies if shipping within D days is feasible.",
    editorialUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/editorial/"
  },
  {
    id: "oa-16",
    name: "Largest Rectangle in Histogram",
    platform: "LeetCode 84",
    problemUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    difficulty: "Hard",
    topic: "Stack & Heap",
    companies: ["Google", "DE Shaw", "Microsoft"],
    badge: "Must Try",
    hint: "Monotonic increasing stack. For each bar, compute nearest smaller bar to left and right to determine max span where bar is minimum height.",
    editorialUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/editorial/"
  },
  {
    id: "oa-17",
    name: "3Sum",
    platform: "LeetCode 15",
    problemUrl: "https://leetcode.com/problems/3sum/",
    difficulty: "Medium",
    topic: "Two Pointers & Sliding Window",
    companies: ["Amazon", "Microsoft", "Salesforce", "Google"],
    badge: "Must Try",
    hint: "Sort the array. Fix the first element i, then run two pointers on remaining subarray. Skip duplicate elements to avoid duplicate triplets.",
    editorialUrl: "https://leetcode.com/problems/3sum/editorial/"
  },
  {
    id: "oa-18",
    name: "Sliding Window Maximum",
    platform: "LeetCode 239",
    problemUrl: "https://leetcode.com/problems/sliding-window-maximum/",
    difficulty: "Hard",
    topic: "Stack & Heap",
    companies: ["Google", "Amazon", "DE Shaw"],
    badge: "Top OA",
    hint: "Use std::deque to maintain a monotonically decreasing sequence of indices. Front of deque always holds the max element for current window of size k.",
    editorialUrl: "https://leetcode.com/problems/sliding-window-maximum/editorial/"
  },
  {
    id: "oa-19",
    name: "Edit Distance",
    platform: "LeetCode 72",
    problemUrl: "https://leetcode.com/problems/edit-distance/",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Microsoft", "Goldman Sachs"],
    badge: "Classic",
    hint: "dp[i][j] represents min operations to convert word1[0...i-1] to word2[0...j-1]. If characters match, dp[i][j] = dp[i-1][j-1]; else 1 + min(insert, delete, replace).",
    editorialUrl: "https://leetcode.com/problems/edit-distance/editorial/"
  },
  {
    id: "oa-20",
    name: "Lowest Common Ancestor of a Binary Tree",
    platform: "LeetCode 236",
    problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    difficulty: "Medium",
    topic: "Graphs & Trees",
    companies: ["Microsoft", "Amazon", "Salesforce", "PhonePe"],
    badge: "High Frequency",
    hint: "Post-order recursive traversal. If root matches p or q, return root. If left and right child calls both return non-null, current root is LCA.",
    editorialUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/editorial/"
  },
  {
    id: "oa-21",
    name: "Valid Anagram & Group Anagrams",
    platform: "LeetCode 49",
    problemUrl: "https://leetcode.com/problems/group-anagrams/",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    companies: ["Amazon", "Uber", "Salesforce"],
    badge: "Foundational",
    hint: "Hash map with sorted string representation or character count frequency tuple as key, mapping to array of original strings.",
    editorialUrl: "https://leetcode.com/problems/group-anagrams/editorial/"
  },
  {
    id: "oa-22",
    name: "Alien Dictionary",
    platform: "LeetCode 269",
    problemUrl: "https://leetcode.com/problems/alien-dictionary/",
    difficulty: "Hard",
    topic: "Graphs & Trees",
    companies: ["Google", "Amazon", "DE Shaw"],
    badge: "Top OA",
    hint: "Compare adjacent words to find first differing characters, adding a directed edge u -> v. Run topological sort with cycle detection.",
    editorialUrl: "https://cp-algorithms.com/graph/topological-sort.html"
  },
  {
    id: "oa-23",
    name: "Partition Equal Subset Sum",
    platform: "LeetCode 416",
    problemUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Microsoft", "Amazon", "PhonePe"],
    badge: "Must Try",
    hint: "If total sum is odd, return false. Otherwise, reduces to 0/1 Knapsack: check if subset with sum equal to total_sum / 2 exists using bitset or 1D boolean DP array.",
    editorialUrl: "https://leetcode.com/problems/partition-equal-subset-sum/editorial/"
  },
  {
    id: "oa-24",
    name: "Word Ladder",
    platform: "LeetCode 127",
    problemUrl: "https://leetcode.com/problems/word-ladder/",
    difficulty: "Hard",
    topic: "Graphs & Trees",
    companies: ["Google", "Amazon", "Goldman Sachs"],
    badge: "Top OA",
    hint: "Shortest transformation sequence in unweighted graph = BFS. Preprocess intermediate wildcard patterns (e.g. h*t) for O(L) neighbor generation.",
    editorialUrl: "https://leetcode.com/problems/word-ladder/editorial/"
  }
];

