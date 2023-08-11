class Solution:
    def hello_world(self, lokesh, nums, target):
        """Returns the first two characters of the string lokesh if the number target is found in the list nums. Otherwise, returns an empty string."""
        for i in range(len(nums)):
            if nums[i] == target:
                return lokesh[i:i+2]
        return ""

if __name__ == "__main__":
    solution = Solution()
#Test Case 1 ::
    lokesh = "goodboy"
    nums = [12,56,73]
    target = 9
    result1 = solution.hello_world(lokesh, nums, target)  # output should be lok

    print(result1)
#Test Case 2 ::
    lokesh1 = "goodboy"
    nums2 = [12,56,73]
    target3 = 9
    result2 = solution.hello_world(lokesh1, nums2, target3)  # output should be lok2

    print(result2)
