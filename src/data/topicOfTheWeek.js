export const topicOfTheWeek = {
  week: 1,
  title: "Two Pointers, Sliding Window & Binary Search on Answer",
  publicationDate: "October 28, 2026",
  status: "Active Topic",
  difficulty: "Fundamental to Intermediate",
  estimatedTime: "6–8 Hours Practice",
  shortDescription:
    "Master interval optimization techniques, monotonic state transitions, and binary decision spaces for contest-level problems.",

  introduction:
    "In timed competitive programming contests, naive brute force solutions often run in O(N²) or O(N³) time, which easily triggers Time Limit Exceeded (TLE) when array size N exceeds 10⁴. Two pointers and sliding window techniques optimize interval exploration to amortized O(N) by leveraging monotonicity. Binary search on answer expands binary search beyond sorted arrays into any monotonic predicate function check(mid), enabling optimal solutions to complex minimax and optimization problems in O(N log(range)) time.",

  prerequisites: [
    {
      name: "Arrays & Dynamic Vectors",
      description: "Contiguous memory layout, indexed access in O(1)."
    },
    {
      name: "Prefix Sums & Running State",
      description: "Preprocessing cumulative sums for constant-time range queries."
    },
    {
      name: "Time & Space Complexity",
      description: "Recognizing constraints (N ≤ 10⁵ requires O(N) or O(N log N))."
    }
  ],

  conceptsAndPatterns: [
    {
      id: "fixed-window",
      title: "1. Fixed-Size Sliding Window",
      summary: "Maintaining a window of exact size K over a linear sequence.",
      explanation:
        "When the interval length K is constant, initialize state (sum, hash, or frequency map) for the first K elements. For subsequent steps from i = K to N-1, add element i and remove element i-K. Each transition takes O(1), keeping total time strictly O(N).",
      codeSnippet: `long long cur_sum = 0;\nfor (int i = 0; i < k; i++) cur_sum += a[i];\nlong long max_sum = cur_sum;\nfor (int i = k; i < n; i++) {\n    cur_sum += a[i] - a[i - k];\n    max_sum = max(max_sum, cur_sum);\n}`
    },
    {
      id: "variable-window",
      title: "2. Variable-Size Sliding Window (Expansion & Contraction)",
      summary: "Finding shortest, longest, or total count of valid contiguous subarrays.",
      explanation:
        "Advance the right pointer to include elements into the window. When an invariant condition is violated (e.g. window sum exceeds S or duplicate count exceeds K), increment the left pointer to shrink the window until the invariant is restored. Because both left and right pointers increment at most N times, the time complexity is amortized O(N).",
      codeSnippet: `int left = 0;\nlong long cur = 0, ans = 0;\nfor (int right = 0; right < n; right++) {\n    cur += a[right];\n    while (left <= right && !isValid(cur)) {\n        cur -= a[left++];\n    }\n    ans = max(ans, (long long)(right - left + 1));\n}`
    },
    {
      id: "two-pointers-sorted",
      title: "3. Two Pointers on Ordered Structures",
      summary: "Opposite-end traversal on sorted arrays for pair targets and partitioning.",
      explanation:
        "Place pointer L at index 0 and pointer R at index N-1. If a[L] + a[R] < target, increment L to increase the sum. If a[L] + a[R] > target, decrement R to decrease the sum. This eliminates an entire row or column of the search space in each step.",
      codeSnippet: `int l = 0, r = n - 1;\nwhile (l < r) {\n    long long sum = a[l] + a[r];\n    if (sum == target) return {l, r};\n    else if (sum < target) l++;\n    else r--;\n}`
    },
    {
      id: "binary-search-answer",
      title: "4. Binary Search on Answer Space (Predicate Check)",
      summary: "Transforming 'Find optimal value' into 'Is value X feasible?'.",
      explanation:
        "If a boolean function check(x) is monotonic (e.g., FFFFTTTT or TTTTFFFF), the search space can be halved iteratively. Define search interval [low, high]. Test mid = low + (high - low) / 2 using a greedy or linear check(mid) in O(N). The total complexity is O(N · log(high - low)).",
      codeSnippet: `long long low = 1, high = 1e14, ans = high;\nwhile (low <= high) {\n    long long mid = low + (high - low) / 2;\n    if (check(mid)) {\n        ans = mid;\n        high = mid - 1; // seek smaller valid answer\n    } else {\n        low = mid + 1;\n    }\n}`
    }
  ],

  learningResources: [
    {
      category: "Articles & Documentation",
      items: [
        {
          title: "Binary Search & Search on Answer",
          platform: "CP-Algorithms",
          url: "https://cp-algorithms.com/num_methods/binary_search.html",
          type: "Technical Reference"
        },
        {
          title: "Two Pointers Technique",
          platform: "USACO Guide (Silver)",
          url: "https://usaco.guide/silver/two-pointers",
          type: "Interactive Guide"
        },
        {
          title: "Window Sliding Technique",
          platform: "GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/window-sliding-technique/",
          type: "Article"
        }
      ]
    },
    {
      category: "Video Tutorials & Visualizations",
      items: [
        {
          title: "Sliding Window Algorithm Deep Dive",
          platform: "NeetCode",
          url: "https://www.youtube.com/watch?v=MK-NZ4hN7Rs",
          type: "Video"
        },
        {
          title: "Binary Search on Answer Space Explained",
          platform: "Errichto Algorithms",
          url: "https://www.youtube.com/watch?v=GU7DpgHINWQ",
          type: "Video"
        }
      ]
    },
    {
      category: "Technical Notes & Invariants",
      items: [
        {
          title: "Proving Sliding Window Invariants & Off-by-One Guardrails",
          platform: "CPS Academic Team",
          url: "#notes",
          type: "CPS Notes"
        }
      ]
    }
  ],

  problemSet: [
    // Easy Tier: Foundations & Invariants
    {
      id: "p1",
      name: "Two Sum II - Input Array Is Sorted",
      platform: "LeetCode 167",
      problemUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Two Pointers", "Sorted Array", "Binary Search"],
      hint: "Since the array is sorted, if sum < target, increasing left pointer guarantees a larger sum. If sum > target, decreasing right pointer guarantees a smaller sum.",
      editorialUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/editorial/"
    },
    {
      id: "p2",
      name: "Maximum Average Subarray I",
      platform: "LeetCode 643",
      problemUrl: "https://leetcode.com/problems/maximum-average-subarray-i/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Fixed Sliding Window", "Prefix State"],
      hint: "Compute the sum of the first k elements. Then slide rightward one element at a time: add nums[i] and subtract nums[i - k].",
      editorialUrl: "https://leetcode.com/problems/maximum-average-subarray-i/editorial/"
    },
    {
      id: "p3",
      name: "Binary Search",
      platform: "LeetCode 704",
      problemUrl: "https://leetcode.com/problems/binary-search/",
      difficulty: "Easy",
      difficultyTier: "Easy",
      tags: ["Binary Search", "Foundations"],
      hint: "Use mid = low + (high - low) / 2 to prevent 32-bit integer overflow.",
      editorialUrl: "https://leetcode.com/problems/binary-search/editorial/"
    },
    {
      id: "p4",
      name: "Sereja and Dima",
      platform: "Codeforces 381A",
      problemUrl: "https://codeforces.com/problemset/problem/381/A",
      difficulty: "800",
      difficultyTier: "Easy",
      tags: ["Two Pointers", "Greedy"],
      hint: "Both players greedily pick max(cards[l], cards[r]). Maintain left and right index pointers until l > r.",
      editorialUrl: "https://codeforces.com/blog/entry/10363"
    },

    // Medium Tier: Standard Applications & Variations
    {
      id: "p5",
      name: "Subarray Product Less Than K",
      platform: "LeetCode 713",
      problemUrl: "https://leetcode.com/problems/subarray-product-less-than-k/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Variable Sliding Window", "Monotonicity"],
      hint: "Expand the right pointer multiplying into running product. If product >= k, divide by nums[left] and increment left. Number of new valid subarrays ending at right is (right - left + 1).",
      editorialUrl: "https://leetcode.com/problems/subarray-product-less-than-k/editorial/"
    },
    {
      id: "p6",
      name: "Books",
      platform: "Codeforces 279B",
      problemUrl: "https://codeforces.com/problemset/problem/279/B",
      difficulty: "1400",
      difficultyTier: "Medium",
      tags: ["Two Pointers", "Sliding Window"],
      hint: "Find the maximum length contiguous subsegment whose sum does not exceed total available time t.",
      editorialUrl: "https://codeforces.com/blog/entry/6915"
    },
    {
      id: "p7",
      name: "Longest Repeating Character Replacement",
      platform: "LeetCode 424",
      problemUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Sliding Window", "Frequency Table"],
      hint: "A window is valid if (window length - maximum character frequency) <= k. Maintain max frequency dynamically.",
      editorialUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/editorial/"
    },
    {
      id: "p8",
      name: "Aggressive Cows",
      platform: "SPOJ AGGRCOW",
      problemUrl: "https://www.spoj.com/problems/AGGRCOW/",
      difficulty: "Classic",
      difficultyTier: "Medium",
      tags: ["Binary Search on Answer", "Greedy Check"],
      hint: "Binary search on distance d in [1, stalls[n-1] - stalls[0]]. check(d) greedily assigns cows at stalls at least d units apart.",
      editorialUrl: "https://cp-algorithms.com/"
    },
    {
      id: "p9",
      name: "Koko Eating Bananas",
      platform: "LeetCode 875",
      problemUrl: "https://leetcode.com/problems/koko-eating-bananas/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Binary Search on Answer"],
      hint: "Check speed mid. Compute sum(ceil(pile / mid)). If total hours <= h, high = mid - 1; otherwise low = mid + 1.",
      editorialUrl: "https://leetcode.com/problems/koko-eating-bananas/editorial/"
    },
    {
      id: "p10",
      name: "Maximum Beauty of an Array After Operation",
      platform: "LeetCode 2779",
      problemUrl: "https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/",
      difficulty: "Medium",
      difficultyTier: "Medium",
      tags: ["Sort", "Sliding Window"],
      hint: "Sort the array. Two elements nums[i] and nums[j] can be equalized if nums[j] - nums[i] <= 2 * k. Find the largest valid window.",
      editorialUrl: "https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/editorial/"
    },

    // Hard Tier: Advanced Applications & Combined Concepts
    {
      id: "p11",
      name: "Minimum Window Substring",
      platform: "LeetCode 76",
      problemUrl: "https://leetcode.com/problems/minimum-window-substring/",
      difficulty: "Hard",
      difficultyTier: "Hard",
      tags: ["Sliding Window", "Two Pointers", "Hash Map"],
      hint: "Track remaining character counts needed from target string t. Use a counter for distinct required characters matched to verify feasibility in O(1).",
      editorialUrl: "https://leetcode.com/problems/minimum-window-substring/editorial/"
    },
    {
      id: "p12",
      name: "Maximum Median",
      platform: "Codeforces 1201C",
      problemUrl: "https://codeforces.com/problemset/problem/1201/C",
      difficulty: "1400",
      difficultyTier: "Hard",
      tags: ["Binary Search on Answer", "Greedy"],
      hint: "Sort the array. In check(mid), calculate total operations required to raise all elements from index n/2 to n-1 to at least mid. Verify if sum <= k.",
      editorialUrl: "https://codeforces.com/blog/entry/68884"
    },
    {
      id: "p13",
      name: "Factory Machines",
      platform: "CSES 1620",
      problemUrl: "https://cses.fi/problemset/task/1620",
      difficulty: "Classic",
      difficultyTier: "Hard",
      tags: ["Binary Search on Answer", "CSES"],
      hint: "Search on time t. In check(t), calculate sum(t / machine_time). If sum >= target products, search lower half.",
      editorialUrl: "https://usaco.guide/silver/binary-search"
    }
  ],

  additionalResources: [
    "Practice all Two Pointers problems on Codeforces EDU Step 1 & Step 2.",
    "Solve the Searching and Sorting section on the CSES problem set (25 foundational problems).",
    "Join the weekly CPS discussion call on Sundays to ask questions and review alternative solutions."
  ]
};
