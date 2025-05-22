"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from "react-native"
import useStore from "../store/useStore"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const UserSelectDropdown = ({ onClose }) => {
  const loggedInAccount = useStore((state) => state.loggedInAccount)
  const users = useStore((state) => state.users)
  const currentUserId = useStore((state) => state.currentUserId)
  const setCurrentUser = useStore((state) => state.setCurrentUser)
  const addUser = useStore((state) => state.addUser)

  const [newUserName, setNewUserName] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  if (!loggedInAccount) return null

  const handleUserChange = (id) => {
    setCurrentUser(id)
    onClose()
  }

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser({ name: newUserName.trim(), id: Date.now() })
      setNewUserName("")
      onClose()
    }
  }

  const filteredUsers = searchQuery
    ? users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : users

  return (
    <View style={styles.dropdown}>
      <View style={styles.header}>
        <Text style={styles.title}>사용자 전환</Text>
        <Text style={styles.subtitle}>사용자를 선택하여 변경하세요</Text>
      </View>

      {isSearching ? (
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="사용자 검색..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity
            onPress={() => {
              setIsSearching(false)
              setSearchQuery("")
            }}
          >
            <Icon name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearching(true)}>
          <Icon name="magnify" size={20} color="#666" />
          <Text style={styles.searchButtonText}>사용자 검색...</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isActive = item.id === currentUserId
          return (
            <TouchableOpacity
              style={[styles.userItem, isActive && styles.activeItem]}
              onPress={() => handleUserChange(item.id)}
            >
              <View style={styles.userInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                <Text style={styles.userText}>{item.name}</Text>
              </View>
              {isActive && <Icon name="check" color="#4285F4" size={20} />}
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{searchQuery ? "검색 결과가 없습니다." : "등록된 사용자가 없습니다."}</Text>
          </View>
        }
        style={styles.list}
      />

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>닫기</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserSelectDropdown

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 65,
    left: 10,
    width: 280,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    padding: 16,
    zIndex: 999,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  searchButtonText: {
    color: "#666",
    marginLeft: 8,
    fontSize: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  list: {
    maxHeight: 300,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  activeItem: {
    backgroundColor: "#edf7ff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    lineHeight: 18,
    textAlign:"center",
    fontWeight: "600",
  },
  userText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign:"center",
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
  },
  closeButton: {
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  closeText: {
    color: "#4285F4",
    fontSize: 20,
    fontWeight: "600",
  },
})
